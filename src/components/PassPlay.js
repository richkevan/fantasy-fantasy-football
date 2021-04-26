import React from 'react'
import {players}from './Players'


export function Pass(possession) {




let currentQB = players.filter(player => player.name === "Mike")
let currentWR = players.filter(player => player.name === "Grom")
let currentRB = players.filter(player => player.name === "Thadeus")
let currentDEF1 = players.filter(player => player.name === "Greck")
let currentDEF2 = players.filter(player => player.name === "Aak")
console.log(currentWR[0].skill)

    let roll = Math.floor(Math.random() * 100)
    console.log(`The computer rolled a ${roll}`)
    
     let yardLine = 0
     
      const passPlay = (roll) => {
        switch(true){

                    case    (roll === 100):
                             yardLine = 100
                            return yardLine    
            
                    case    (roll >= (70 - 
                            currentQB[0].skill - 
                            currentRB[0].skill + 
                            currentDEF1[0].runDefenseSkill +
                            currentDEF2[0].runDefenseSkill)):
            
                            yardLine = Math.floor(Math.random() * 30) + 20
                            
                            return yardLine
    
        
                    case    (roll >= 68 - 
                            (currentQB[0].skill - 
                            currentRB[0].skill + 
                            currentDEF1[0].runDefenseSkill +
                            currentDEF2[0].runDefenseSkill)
                            && 
                            roll <= 40 - 
                            (currentQB[0].skill - 
                            currentRB[0].skill + 
                            currentDEF1[0].runDefenseSkill +
                            currentDEF2[0].runDefenseSkill)):
                            
                            yardLine = Math.floor(Math.random() * 10)
                            return yardLine
        
    
                     case   (roll > 1
                            && 
                            roll <= 39 - 
                            (currentQB[0].skill - 
                            currentRB[0].skill + 
                            currentDEF1[0].runDefenseSkill +
                            currentDEF2[0].runDefenseSkill)):
           
                            
                            console.log("No Gain")
                            return yardLine
        
    
        // case (roll < 3):
        //     if(possession === "home"){
        //         possession = "away"
        //     }
        //     else possession = "home"
        //     return `It is now ${possession}s ball`
            
        
    
        default: return null
    }
    
      }
    return passPlay(roll)
    }
