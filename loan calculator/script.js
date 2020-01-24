


document.getElementById('loan-form').addEventListener('submit', function(e){

    //show loader
    document.getElementById('loading').style.display = 'block';

    //hide results
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResults, 2000);

        e.preventDefault()

});

function calculateResults() {

    console.log('calculating....');

    const amountUI = document.getElementById('amount');
    const interestUI = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthlypayment');
    const totalPayment = document.getElementById('totalpayment');
    const totalInterest = document.getElementById('totalinterest');

    const principal = parseFloat(amountUI.value);
    const calculatedInterest = parseFloat(interestUI.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;


    //monthly payment
    const x = Math.pow(1+ calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/ (x -1);

    if(isFinite(monthly)){

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        console.log('Please che');
        showError('Please check your number');
    }


    console.log(amountUI);
}

// show error
function showError(err){


    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';



    //create div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(err));

    //clear after 3 seconds
    setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('.alert').remove();
}