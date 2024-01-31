const fs = require('node:fs');
console.log(process.argv[2])
//get input file
let input = fs.readFileSync(process.argv[2],'utf8')


const lines = input.trim().split('\n');
const [height, width, numBricks] = lines[0].split(' ').map(Number);

if(height <= 0 || width <=0 || numBricks <= 0) {
    console.log("Invalid input");
    process.exit()
}

let brickArr = [];
let colorBrick = new Array(height);
let groupBrick = new Array();
let groupTotalArr = new Array(numBricks);

// insert input in array
for(let i=1;i < lines.length;i++) {
    let arr = lines[i].split(' ').map(Number);
    let sum=0;
    let eachBrick =[];
    for(let j=0;j < arr.length;j=j+2){
        sum = sum + arr[j+1]
        let obj ={
            color:arr[j],
            val:arr[j+1],
            group:i-1,
            sum
        }
        eachBrick.push(obj);
    }
    eachBrick = eachBrick.map(e => {
        e.sum = sum;
        //filter color wise brick 
        if(Array.isArray(colorBrick[e.color])){
            colorBrick[e.color].push(e)
        } else {
            colorBrick[e.color] = [e]
        }
        // filter group wise brick
        if(Array.isArray(groupBrick[e.group])){
            groupBrick[e.group].push(e)
        } else {
            groupBrick[e.group] = [e]
        }
        groupTotalArr[e.group] = e.sum
        return e
    })

    brickArr.push(eachBrick)
}
// remove brick
let removeGroup =[];
colorBrick = colorBrick.map(e=>{
    e.sort((a,b) => b.sum - a.sum)
    for(let i=width;i<e.length;i++){
        removeGroup.push(e[i].group)
        groupTotalArr[e[i].group] = 0;
    }
    return e;
})
colorBrick = colorBrick.map(e=>{
    for(let i=0;i<e.length;i++) {
        if(removeGroup.indexOf(e[i].group) >= 0 )  e.splice(i, 1)
    }
    return e;
})

//sum of brick values
let total = 0
groupTotalArr.forEach(e=> total += e )
console.log("------result-------");
console.log(total);




