# ============================================================
# TERRAFORM - main.tf
# ============================================================
# Este es el archivo principal de Terraform.
# Define TODA la infraestructura de Lovia en Azure.
#
# Con este archivo y un "terraform apply", Terraform crea:
#   ✅ Resource Group
#   ✅ Static Web App (donde corre Lovia)
#   ✅ Key Vault (guarda secrets de forma segura)
#   ✅ Application Insights (telemetría y monitoreo)
#   ✅ Log Analytics Workspace (centraliza logs)
#
# COMANDOS BÁSICOS:
#   terraform init     → descarga los providers (como npm install)
#   terraform plan     → muestra qué va a crear/cambiar (preview)
#   terraform apply    → CREA la infraestructura real
#   terraform destroy  → ELIMINA todo (cuidado en prod!)
# ============================================================

# ----------------------------------------------------------
# PROVIDER: le dice a Terraform con qué nube trabajar
# ----------------------------------------------------------
terraform {
  required_version = ">= 1.6.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.85"
    }
  }

  # BACKEND: dónde guarda Terraform su "estado" (qué creó)
  # En producción SIEMPRE usa un backend remoto, no local
  # Aquí usamos Azure Blob Storage como backend
  # (descomenta cuando tengas el storage account creado)
  #
  # backend "azurerm" {
  #   resource_group_name  = "lovia-tfstate-rg"
  #   storage_account_name = "loviatfstate"
  #   container_name       = "tfstate"
  #   key                  = "lovia.terraform.tfstate"
  # }
}

provider "azurerm" {
  features {
    key_vault {
      # Protección: no elimina el Key Vault aunque hagas destroy
      purge_soft_delete_on_destroy    = false
      recover_soft_deleted_key_vaults = true
    }
  }
}

# ----------------------------------------------------------
# LOCAL VALUES: variables calculadas internamente
# ----------------------------------------------------------
locals {
  # Nombre base para todos los recursos (ej: "lovia-prod")
  resource_prefix = "${var.project_name}-${var.environment}"

  # Tags que se aplican a TODOS los recursos
  # En empresas esto es MUY importante para billing y organización
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"        # Indica que no se toca manualmente
    Repository  = "github.com/R0s3mrcx/lovia"
    CreatedAt   = "2024"
  }
}

# ----------------------------------------------------------
# 1. RESOURCE GROUP
# ----------------------------------------------------------
# Un Resource Group es un contenedor lógico en Azure.
# Todos los recursos de Lovia van dentro de este grupo.
resource "azurerm_resource_group" "lovia" {
  name     = "${local.resource_prefix}-rg"
  location = var.location
  tags     = local.common_tags
}

# ----------------------------------------------------------
# 2. STATIC WEB APP (donde corre Lovia)
# ----------------------------------------------------------
# Azure Static Web Apps es el servicio que ya usas.
# Con Terraform, si lo borras accidentalmente, con "terraform apply"
# lo recreas EXACTAMENTE igual en segundos.
resource "azurerm_static_site" "lovia" {
  name                = "${local.resource_prefix}-app"
  resource_group_name = azurerm_resource_group.lovia.name
  location            = azurerm_resource_group.lovia.location
  sku_tier            = "Free"   # Cambia a "Standard" para custom domains + SSL
  sku_size            = "Free"

  tags = local.common_tags
}

# ----------------------------------------------------------
# 3. LOG ANALYTICS WORKSPACE (centraliza todos los logs)
# ----------------------------------------------------------
# Log Analytics es como una base de datos para tus logs.
# Application Insights lo usa como storage.
resource "azurerm_log_analytics_workspace" "lovia" {
  name                = "${local.resource_prefix}-logs"
  resource_group_name = azurerm_resource_group.lovia.name
  location            = azurerm_resource_group.lovia.location
  sku                 = "PerGB2018"   # Pagas por GB (primeros 5GB gratis)
  retention_in_days   = 30            # Guarda 30 días de logs

  tags = local.common_tags
}

# ----------------------------------------------------------
# 4. APPLICATION INSIGHTS (telemetría y monitoreo)
# ----------------------------------------------------------
# Application Insights te da:
#   - Métricas de rendimiento (tiempo de respuesta, etc.)
#   - Errores y excepciones
#   - Tráfico y usuarios
#   - Alertas automáticas
resource "azurerm_application_insights" "lovia" {
  name                = "${local.resource_prefix}-insights"
  resource_group_name = azurerm_resource_group.lovia.name
  location            = azurerm_resource_group.lovia.location
  workspace_id        = azurerm_log_analytics_workspace.lovia.id
  application_type    = "web"

  tags = local.common_tags
}

# ----------------------------------------------------------
# 5. KEY VAULT (guarda secrets de forma segura)
# ----------------------------------------------------------
# NUNCA guardes secrets (passwords, API keys) en el código.
# Azure Key Vault los guarda cifrados y con control de acceso.
data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "lovia" {
  name                = "${local.resource_prefix}-kv"  # Máx 24 chars, único globalmente
  resource_group_name = azurerm_resource_group.lovia.name
  location            = azurerm_resource_group.lovia.location
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"

  # Solo TÚ (el que hace terraform apply) puede acceder a los secrets
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge", "Recover"
    ]
  }

  tags = local.common_tags
}

# Guarda el URL de Supabase en Key Vault (cifrado)
resource "azurerm_key_vault_secret" "supabase_url" {
  name         = "supabase-url"
  value        = var.supabase_url
  key_vault_id = azurerm_key_vault.lovia.id
}

# Guarda la clave anónima de Supabase en Key Vault (cifrada)
resource "azurerm_key_vault_secret" "supabase_anon_key" {
  name         = "supabase-anon-key"
  value        = var.supabase_anon_key
  key_vault_id = azurerm_key_vault.lovia.id
}
