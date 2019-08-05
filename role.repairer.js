const havestPath = require('moveSetting').getPath('havest')
const { getEngry, updateState } = require('utils')

const run = (creep) => {
    const working = updateState(creep, '⚙ 修复')

    if (working) {
        repair(creep)
    }
    else {
        getEngry(creep)
    }
}

/**
 * 修复结构
 * @todo 修复城墙
 * 
 * @param {object} creep
 */
const repair = (creep) => {
    const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: structure => {            
            return structure.hits < (structure.hitsMax) &&
                   structure.structureType != STRUCTURE_WALL
        }
    })
    
    if (target) {
        // 修复结构实现
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, havestPath)
        }
    }
}

module.exports = {
    run
}