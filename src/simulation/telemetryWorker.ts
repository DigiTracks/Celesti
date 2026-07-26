self.onmessage = () => {
  setInterval(() => {
    const particleCount = Math.floor(2800 + (Math.random() * 200 - 100))
    const tempC = parseFloat((20.2 + (Math.random() * 0.4 - 0.2)).toFixed(2))
    const rhPct = parseFloat((44.5 + (Math.random() * 1.0 - 0.5)).toFixed(1))

    self.postMessage({
      type: 'TELEMETRY_TICK',
      payload: {
        facilityId: 'FAC-BLR-01',
        particleCount05um: particleCount,
        temperatureC: tempC,
        relativeHumidityPct: rhPct,
        timestamp: new Date().toISOString(),
      },
    })
  }, 3000)
}
