var SORTABLE_COUNT = 50
var SORTABLE_SPEED = 50
var SORTABLE_TYPE = 'bubble'
$('#barCountRange').val(SORTABLE_COUNT)
$('#speedRange').val(SORTABLE_SPEED)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const setVisualState = (arr) => {
    for (var i = 1; i <= SORTABLE_COUNT; i++) {
        $(`#sortBar${i}`).css({
            height: `${arr[i-1]}%`,
        })
     }
}

const resetVisualShuffle = (arr) => {
    arr = shuffleArray(arr);
    for (var i = 1; i <= SORTABLE_COUNT; i++) {
        $(`#sortBar${i}`).css({
            height: `${arr[i-1]}%`,
        })
     }
}

for (var i = 1; i <= SORTABLE_COUNT; i++) {
    $('.stage').append($(`<div class="sortable-bar" id="sortBar${i}"></div>`));
}

let sortableArray = []

for (var i = 1; i <= SORTABLE_COUNT; i++) {
    sortableArray.push(parseInt((i/SORTABLE_COUNT*100).toFixed()))
 }

sortableArray = shuffleArray(sortableArray)

for (var i = 1; i <= SORTABLE_COUNT; i++) {
    $(`#sortBar${i}`).css({
        height: `${sortableArray[i-1]}%`,
    })
 }

$('#shuffleButton').click(()=>{
    resetVisualShuffle(sortableArray)
    })

$('#resetButton').click(async ()=>{
    $('#barCountRange').css({
        pointerEvents:'none',
        cursor: 'wait'
    })
    $('#speedRange').css({
        pointerEvents:'none',
        cursor: 'wait'
    })
    // await selectionSort(sortableArray)
    await sortingData[SORTABLE_TYPE].sort(sortableArray)
    $('#barCountRange').css({
        pointerEvents:'unset',
        cursor: 'pointer'
    })
    $('#speedRange').css({
        pointerEvents:'unset',
        cursor: 'pointer'
    })
})

$('#barCountRange').change(()=>{
   SORTABLE_COUNT = ($('#barCountRange').val())
   $('#count').text(`BAR COUNT : ${SORTABLE_COUNT}`)
   $('.stage').html('')
   for (var i = 1; i <= SORTABLE_COUNT; i++) {
    $('.stage').append($(`<div class="sortable-bar" id="sortBar${i}"></div>`));
    }
    sortableArray = []
    setVisualState(sortableArray)
    for (var i = 1; i <= SORTABLE_COUNT; i++) {
        sortableArray.push(parseInt((i/SORTABLE_COUNT*100).toFixed()))
     }
     sortableArray = sortableArray.sort((a, b) => a - b)
     setVisualState(sortableArray)
})



$('#speedRange').change(()=>{
    SORTABLE_SPEED = ($('#speedRange').val())
    $('#speed').text(`SPEED : ${SORTABLE_SPEED}ms`)
 })


 $("[id=sortBox]").click(function () {
    let sorter = $(this).attr("data-sort");
    $('#sorters').find('*').removeClass('active')
    SORTABLE_TYPE = sorter
    $(`#sortBox[data-sort=${SORTABLE_TYPE}]`).addClass('active')
  });

const sortingData = {
    bubble:{
        sort: async function (arr){
            var len = arr.length;
            for (var i = len-1; i>=0; i--){
              for(var j = 1; j<=i; j++){
                if(arr[j-1]>arr[j]){
                    var temp = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = temp;
                    setVisualState(arr)
                    await sleep(SORTABLE_SPEED)
                 }
              }
            }
            setVisualState(arr)
            return arr;
         }
    },
    selection:{
        sort: async function (arr){
            var minIdx, temp, 
                len = arr.length;
            for(var i = 0; i < len; i++){
              minIdx = i;
              for(var  j = i+1; j<len; j++){
                 if(arr[j]<arr[minIdx]){
                    minIdx = j;
                    await sleep(SORTABLE_SPEED)
                    setVisualState(arr)
                 }
              }
              temp = arr[i];
              arr[i] = arr[minIdx];
              arr[minIdx] = temp;
            }
            setVisualState(arr)
            return arr;
          }
    },
    insertion:{
        sort: async function (arr){
            var pos, temp,
                len = arr.length;
            for(var i = 1; i < len; i++){
                pos = i
                for(var j = i-1; j>=0;j--){
                    if(arr[pos]<arr[j]){
                        temp = arr[pos]
                        arr[pos] = arr[j]
                        arr[j] = temp
                        pos--
                        await sleep(SORTABLE_SPEED)
                        setVisualState(arr)
                    }
                }
            }
            setVisualState(arr)
            return arr;
        }
    }
}


