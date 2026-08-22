# Script de Deploy Automático via FTP para Hostinger (Dev Web)
param (
    [string]$FtpHost = "77.37.127.83",
    [string]$FtpUser = "u928694573.limegreen-salamander-658473.hostingersite.com",
    [string]$FtpPass = "Icenv@1adm"
)

Write-Host "🔨 Gerando build de produção..." -ForegroundColor Cyan
docker compose exec web npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Falha ao gerar o build!"
    exit 1
}

$user = "$($FtpUser):$($FtpPass)"
$ftpBase = "ftp://$FtpHost"
$distPath = (Get-Item "dist").FullName

Write-Host "🚀 Enviando arquivos para Hostinger via FTP..." -ForegroundColor Cyan

Get-ChildItem -Path $distPath -Recurse -File | ForEach-Object {
    $relative = $_.FullName.Substring($distPath.Length).Replace("\", "/").TrimStart("/")
    $encodedRelative = [System.Uri]::EscapeUriString($relative)
    $url = "$ftpBase/$encodedRelative"
    Write-Host "  -> Uploading: $relative"
    curl.exe --user $user -T $_.FullName $url
}

Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
Write-Host "🔗 Acesse: https://limegreen-salamander-658473.hostingersite.com" -ForegroundColor Yellow
