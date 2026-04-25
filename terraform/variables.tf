# ============================================================
# TERRAFORM - variables.tf
# ============================================================
# Terraform es "Infraestructura como Código" (IaC)
# En vez de crear recursos en Azure haciendo clic en la web,
# los describes en código y Terraform los crea automáticamente.
#
# Este archivo define las VARIABLES que usará el resto de Terraform
# (como parámetros de una función)
# ============================================================

variable "project_name" {
  description = "Nombre del proyecto. Se usa en los nombres de recursos de Azure."
  type        = string
  default     = "lovia"
}

variable "environment" {
  description = "Entorno del despliegue: dev, staging, o prod"
  type        = string
  default     = "prod"

  # Validación: solo se aceptan estos 3 valores
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser 'dev', 'staging' o 'prod'."
  }
}

variable "location" {
  description = "Región de Azure donde se crean los recursos"
  type        = string
  default     = "West Europe"
  # Otras opciones: "East US", "UK South", "North Europe"
}

variable "supabase_url" {
  description = "URL de tu proyecto Supabase. Se guarda como Secret en Azure."
  type        = string
  sensitive   = true  # Terraform no la muestra en logs
}

variable "supabase_anon_key" {
  description = "Clave pública anónima de Supabase."
  type        = string
  sensitive   = true
}

variable "sentry_dsn" {
  description = "DSN de Sentry para reportar errores en producción."
  type        = string
  sensitive   = true
  default     = ""
}
