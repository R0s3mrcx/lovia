# ============================================================
# TERRAFORM - outputs.tf
# ============================================================
# Los outputs son valores que Terraform muestra después de
# ejecutar "terraform apply". Son útiles para:
#   - Ver la URL de tu app desplegada
#   - Pasar valores a otros sistemas (CI/CD, scripts, etc.)
#   - Confirmar que todo se creó correctamente
# ============================================================

output "static_web_app_url" {
  description = "URL pública de Lovia en Azure Static Web Apps"
  value       = "https://${azurerm_static_site.lovia.default_host_name}"
}

output "static_web_app_api_key" {
  description = "API key para hacer deploy desde GitHub Actions"
  value       = azurerm_static_site.lovia.api_key
  sensitive   = true   # No se muestra en logs, solo con terraform output -raw
}

output "application_insights_connection_string" {
  description = "Connection string de Application Insights para monitoreo"
  value       = azurerm_application_insights.lovia.connection_string
  sensitive   = true
}

output "application_insights_instrumentation_key" {
  description = "Instrumentation key de Application Insights"
  value       = azurerm_application_insights.lovia.instrumentation_key
  sensitive   = true
}

output "key_vault_uri" {
  description = "URI del Key Vault donde están guardados los secrets"
  value       = azurerm_key_vault.lovia.vault_uri
}

output "resource_group_name" {
  description = "Nombre del Resource Group (útil para scripts de Azure CLI)"
  value       = azurerm_resource_group.lovia.name
}

output "log_analytics_workspace_id" {
  description = "ID del workspace de Log Analytics"
  value       = azurerm_log_analytics_workspace.lovia.id
}
