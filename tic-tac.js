var playerName = 'X';
var listX = [];
var listO = [];
var countX=0,countO=0;
var combinations = [ ['1','2','3'],
                     ['4','5','6'],
                     ['7','8','9'],
                     ['1','4','7'],
                     ['2','5','8'],
                     ['3','6','9'],
                     ['1','5','9'],
                     ['3','5','7'] ]

var alreadyMarked = [];
var flag = 0;

function name(value,boxNo)
{
    // to avoid marking of already marked boxes
    for(var i=0; i<alreadyMarked.length; i++)
    {
        if(value==alreadyMarked[i])
        {
            return 0;
        }
    }
    alreadyMarked.push(value)

    // to change innnerhtml of the div
    var x = getId(boxNo);
    x.innerHTML=playerName;

    // to change playerName for next call
    if(playerName == 'X')
    {
        playerName = 'O';
        listX.push(value);

        // to check the combinations
        if(listX.length >= 3)
        {
            for (var i=0; i<combinations.length; i++)
            {
                countX=0;
                for (var j=0; j<3; j++)
                {
                    for (var k=0; k<listX.length; k++)
                    {
                        if(combinations[i][j]==listX[k])
                        {
                            countX++;
                        }
                    }
                    if(countX==3)
                    {
                        var z = getId('result');
                        z.innerHTML='<h3>Player X is the winner</h3>';
                        getId('modalButton').click(); 
                        disableClick();
                        flag = 1;
                        break;
                    }
                }
            }
        }
    }
    else
    {
        playerName = 'X';
        listO.push(value);

        if(listO.length >= 3)
        {
            for (var i=0; i<combinations.length; i++)
            {
                countO=0;
                for (var j=0; j<3; j++)
                {
                    for (var k=0; k<listO.length; k++)
                    {
                        if(combinations[i][j]==listO[k])
                        {
                            countO++;
                        }
                    }
                    if(countO==3)
                    {
                        var z = getId('result');
                        z.innerHTML='<h3>Player O is the winner</h3>';
                        getId('modalButton').click();
                        disableClick();
                        flag = 1;
                        break;
                    }
                }
            }
        }
    }
    if (flag==0 && alreadyMarked.length==9)
    {
        var z = getId('result');
        z.innerHTML='<h3>Match drawn</h3>';
        getId('modalButton').click();   
        disableClick(); 
        return 0;
    }
}

function getId(id)
{
    return document.getElementById(id);
}

function reset()
{
    location.reload();
}

function disableClick(){
    for (var i=1;i<=9;i++)
    {
        var s = 'b';
        s += i.toString();
        getId(s).style.pointerEvents='none';
    }
}

function undo() 
{
    var z = alreadyMarked.pop()
    var s = 'b'+z.toString()
    getId(s).innerHTML='';
}