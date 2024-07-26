document.getElementById('simulationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let initialHealth = parseFloat(document.getElementById('initialHealth').value);
    let initialMentalState = parseFloat(document.getElementById('initialMentalState').value);
    let healthDecreasePerDay = parseFloat(document.getElementById('healthDecreasePerDay').value);
    let mentalStateDecreasePerDay = parseFloat(document.getElementById('mentalStateDecreasePerDay').value);
    let healthRestore = parseFloat(document.getElementById('healthRestore').value);
    let mentalStateRestore = parseFloat(document.getElementById('mentalStateRestore').value);
    let randomEventProbability = parseFloat(document.getElementById('randomEventProbability').value);
    let randomEventImpact = parseFloat(document.getElementById('randomEventImpact').value);
    let dailyEarningsPerPerson = parseFloat(document.getElementById('dailyEarningsPerPerson').value);
    let numSimulations = parseInt(document.getElementById('numSimulations').value);
    
    function simulateWildernessStay(initialHealth, initialMentalState) {
        let health = initialHealth;
        let mentalState = initialMentalState;
        let days = 0;
        
        while (health > 0 && mentalState > 0) {
            days++;
            health -= healthDecreasePerDay;
            mentalState -= mentalStateDecreasePerDay;
            
            if (Math.random() < randomEventProbability) {
                if (Math.random() < 0.5) {
                    health -= randomEventImpact;
                } else {
                    mentalState -= randomEventImpact;
                }
            }
            
            if (days % 7 === 0) {
                health = Math.min(health + healthRestore, initialHealth);
                mentalState = Math.min(mentalState + mentalStateRestore, initialMentalState);
            }
        }
        
        return days;
    }
    
    function runMultipleSimulations(numSimulations) {
        let totalDaysStayed = 0;
        let totalEarnings = 0;
        
        for (let i = 0; i < numSimulations; i++) {
            let daysStayed = simulateWildernessStay(initialHealth, initialMentalState);
            totalDaysStayed += daysStayed;
            totalEarnings += daysStayed * dailyEarningsPerPerson * 2;
        }
        
        let averageDaysStayed = totalDaysStayed / numSimulations;
        let averageEarnings = totalEarnings / numSimulations;
        
        return { averageDaysStayed, averageEarnings };
    }
    
    let results = runMultipleSimulations(numSimulations);
    
    document.getElementById('averageDaysStayed').textContent = `Average days stayed: ${results.averageDaysStayed.toFixed(2)}`;
    document.getElementById('averageEarnings').textContent = `Average earnings: $${results.averageEarnings.toFixed(2)} USD`;
});
