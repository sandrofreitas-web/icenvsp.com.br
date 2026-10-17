# Script de Deploy Automático via FTP para Produção Oficial (Hostinger)
param (
    [string]$FtpHost = "77.37.127.83",
    [string]$FtpUser = "u928694573",
    [string]$FtpPass = "7or#Yie[h7:e4+|W",
    [string]$RemoteDir = "domains/icenvsp.com.br/public_html"
)

Write-Host 'Gerando build de producao - Modo Limitado...' -ForegroundColor Cyan
docker compose exec web npm run build:limited

if ($LASTEXITCODE -ne 0) {
    Write-Error 'Falha ao gerar o build de producao!'
    exit 1
}

$user = "$($FtpUser):$($FtpPass)"
$ftpBase = "ftp://$FtpHost/$RemoteDir"
$distPath = (Get-Item "dist").FullName

Write-Host "Enviando arquivos para Producao na Hostinger via FTP ($RemoteDir)..." -ForegroundColor Cyan

Get-ChildItem -Path $distPath -Recurse -File | ForEach-Object {
    $relative = $_.FullName.Substring($distPath.Length).Replace("\", "/").TrimStart("/")
    $encodedRelative = [System.Uri]::EscapeUriString($relative)
    $url = "$ftpBase/$encodedRelative"
    Write-Host "  -> Uploading: $relative"
    curl.exe --ftp-create-dirs --user $user -T $_.FullName $url
}

Write-Host "✅ Deploy de PRODUÇÃO concluído com sucesso!" -ForegroundColor Green
Write-Host "🔗 Acesse o site oficial: https://icenvsp.com.br" -ForegroundColor Yellow
