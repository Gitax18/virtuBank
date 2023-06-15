const delBtn = document.getElementById('del-btn');

delBtn.addEventListener('click', ()=>{
    const conf = confirm('Are you sure to delete your account.')
    
    if(conf){
        localStorage.clear()
        location.href = 'index.html'
    } else location.href = 'delete.html'
})