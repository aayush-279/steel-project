# This script helps diagnose MongoDB Atlas connectivity issues
Write-Host "Checking connection to MongoDB Atlas..." -ForegroundColor Cyan

$hostName = "patelbhai.1ztzhpa.mongodb.net"

try {
    $resolved = Resolve-DnsName $hostName -ErrorAction Stop
    Write-Host "✅ DNS Resolution Success! Your computer can see the Atlas servers." -ForegroundColor Green
    
    Write-Host "`nChecking if your IP is whitelisted..." -ForegroundColor Cyan
    $tcpConnection = Test-NetConnection -ComputerName $hostName -Port 27017 -InformationLevel Quiet
    
    if ($tcpConnection) {
        Write-Host "✅ Network Connection Success! Port 27017 is open." -ForegroundColor Green
    } else {
        Write-Host "❌ Network Connection Failed. This is usually caused by:" -ForegroundColor Red
        Write-Host "   1. Your IP address is NOT whitelisted in MongoDB Atlas." -ForegroundColor Yellow
        Write-Host "   2. A firewall or office/school network is blocking port 27017." -ForegroundColor Yellow
        Write-Host "`n👉 FIX: Go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ DNS Resolution Failed. Your internet provider cannot find the database." -ForegroundColor Red
    Write-Host "Try running: ipconfig /flushdns" -ForegroundColor Yellow
    Write-Host "If that fails, try using your Mobile Hotspot." -ForegroundColor Yellow
}

Write-Host "`nTest complete."
pause
