const reviewForm = document.getElementById('reviewForm');


reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    let username = e.target.username.value;
    let desk = e.target.desk.value;
    let review = e.target.review.value;


    let body = {
        username: username,
        desk: desk,
        review: review
    }

    fetch('/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(data => {
        console.log(data)

    })

    reviewForm.reset()
})


function deskbtn (deskNumber)  {
    fetch(`/reviews/${deskNumber}`).then(res => res.json()).then(data => {
        console.log(data)
        document.getElementById('reviewContainer').innerHTML = renderReviews(data)
    })

   
};

function renderReviews (results) {
   return results.map(result => {
        return`
        <div class="card">
            <div class="card-header">
                ${result.desk}
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>${result.review}</p>
                    <footer class="blockquote-footer"><cite title="Source Title">${result.username}</cite></footer>
                </blockquote>
            </div>
        </div>`
        }).join('')
}