'use strict'

var gBoard
var gSize
var gNums
var gCount
var gInterval
var sec = 0
var min = 0
var gStartTime

function onInit() {
    gSize = 4
    resetNums()
    gBoard = createBoard(gSize)
    gCount = 1
    renderBoard(gBoard)
}

function createBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = drawNum()
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '\n<tr>'
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j]
            strHTML += `<td onclick="cellClicked(this,${cell})">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function cellClicked(elTd, clickedNum) {
    if (gCount === clickedNum) {
        elTd.classList.add('clicked')
        if (clickedNum === 1) startTimer()
        if (gCount === gSize * gSize) clearInterval(gInterval)
        gCount++
        var elNextNum = document.querySelector('.next-num')
        if (gCount <= gSize * gSize) {
            elNextNum.innerText = `The next number is: ${gCount}`
        } else {
            elNextNum.style.color = 'red'
            elNextNum.innerText = `Game Over. You won!`

        }
    }

    console.log('gCount:', gCount)
}

function startTimer() {
    gStartTime = Date.now()
    gInterval = setInterval(() => {
        const seconds = (Date.now() - gStartTime) / 1000
        var elSpan = document.querySelector('.time span')
        elSpan.innerText = seconds.toFixed(3)
    }, 1)
}

function onChooseLevel(size) {
    var elNextNum = document.querySelector('.next-num')
    elNextNum.innerText = `The next number is: 1`
    clearInterval(gInterval)
    var elSpan = document.querySelector('.time span')
    elSpan.innerText = '00:00'
    gSize = size
    gNums = size ** 2
    gCount = 1
    resetNums()
    gBoard = createBoard(gSize)
    renderBoard(gBoard)
}

///////////////////////////////////////////////////////////////////////////////////////////

function drawNum() {
    var randIdx = getRandomInt(0, gNums.length)
    var num = gNums[randIdx]
    gNums.splice(randIdx, 1)
    return num
}

function resetNums() {
    gNums = []
    for (var i = 1; i <= gSize * gSize; i++) {
        gNums.push(i)
    }
    return gNums
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
