const CHACE_KEY = "calculation_history" ;

const checkForStorage = () => {
    return typeof( Storage ) !== 'undefined'
}

const putHistory = (data) =>  {

    if(checkForStorage()) {
        let historyData = null ;
        if(localStorage.getItem(CHACE_KEY) === null ) {
            historyData = [] ;
        }else{
            historyData = JSON.parse(localStorage.getItem(CHACE_KEY)) ;
        }
 

    
    historyData.unshift(data);
    

    if(historyData.length > 5 ) {
        historyData.pop() ;
    }


    localStorage.setItem(CHACE_KEY,JSON.stringify(historyData));

}
}


const showHistory = ()  => {
    if(checkForStorage) {
        return JSON.parse(localStorage.getItem(CHACE_KEY)) || [] ;
    }else {
        return [] ;
    }
}


const renderHistory = () => {
    const historyData = showHistory();

    let historyList = document.querySelector('#history-table')
    historyData.innerHTML = '';

    for( let history of historyData) {
        let row = document.createElement('tr');

        row.innerHTML = '<td>' + history.firstNumber + '</td>'
        row.innerHTML += '<td>' + history.operator + '</td>'
        row.innerHTML += '<td>' + history.secondNumber + '</td>'
        row.innerHTML += '<td>' + history.result + '</td>'


        historyList.appendChild(row);
    }


}

renderHistory();