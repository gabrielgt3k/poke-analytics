const faker = require('faker')
const captures = require('./captures.json')

const MAX_POKEMON_NUMBER = 898

function randomNumber(max) {
    return faker.random.number(max) + 1
}

function generateBattleTeam(teamSize = 6) {

    const team = []
    let i = 0

    while (i < teamSize) {
        team.push({ pokedexNumber: randomNumber(MAX_POKEMON_NUMBER) })

        i++
    }

    return team
}

function generateCapturesByRegion(captures) {
    const capturesByRegion = {}

    captures.forEach(capture => {
        if (capturesByRegion[capture.region] !== undefined) {
            capturesByRegion[capture.region]++
        } else {
            capturesByRegion[capture.region] = 1
        }
    })

    return capturesByRegion

}

function generateCapturesByType(captures) {
    const captureByType = {}

    captures.forEach(capture => {
        if (captureByType[capture.type] !== undefined) {
            captureByType[capture.type]++
        } else {
            captureByType[capture.type] = 1
        }

    })

    return captureByType
}

module.exports = () => {
    console.log("INICIALIZANDO PREENCHIMENTO DE DADOS MOCKADOS DA API")
    const data = {
        battle_team: [],
        captures: captures,
        reports: {
            capturesByType: {},
            capturesByRegion: {}
        }
    }

    data.battle_team.push(...generateBattleTeam())
    data.reports.capturesByType = generateCapturesByType(data.captures)
    data.reports.capturesByRegion = generateCapturesByRegion(data.captures)

    return data
}

