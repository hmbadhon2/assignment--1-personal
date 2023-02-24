// select dom element 
const matchContainer = document.querySelector('.all-matches');
const addMatch = document.querySelector('.lws-addMatch');
const singleResult = document.querySelectorAll('.lws-singleResult')[0];
const totalResult = document.querySelectorAll('.lws-singleResult');
const resetButton = document.querySelector('.lws-reset');
console.log(matchContainer);
console.log('hello')


// const initialState = [
//     {
//         id:0,
//         value:0,
//     },
// ]

const initialState ={
    id:0,
    value:0,
}
 
    function scoreReducer (state=initialState, action ){
        // console.log(state)
     if(action.type==='increment'){
        return {
            ...state,
            value: state.value + action.payload,
        }
     }else if(action.type==='decrement'){
        return{
            ...state,
            value:state.value - action.payload,
        }
     }else{
        return state;
     }
    
    }



// create store 
const store = Redux.createStore(scoreReducer);

// create render function 


const render =()=>{
//   for ( state of initialState){
//     console.log(state)
//     if(state.value<0){
//         state.value=0;
//      }else{
//         singleResult.innerText= state.value;
//      }
//   }

 const state = store.getState();
    if(state.value<0){
        state.value=0;
     }else{
        singleResult.innerText= state.value;
     }

}
render();

// // store subscribe
store.subscribe(render);

// create new match function
let serial = 2;
function newMatch(){
   const matchDiv=document.createElement('div');
   matchDiv.classList.add('match');
   matchDiv.innerHTML = `<div class="wrapper">
   <button class="lws-delete">
       <img src="./image/delete.svg" alt="" />
   </button>
   <h3 class="lws-matchName">Match ${serial++}</h3>
</div>
<div class="inc-dec">
   <form class="incrementForm">
       <h4>Increment</h4>
       <input
           type="number"
           name="increment"
           class="lws-increment"
       />
   </form>
   <form class="decrementForm">
       <h4>Decrement</h4>
       <input
           type="number"
           name="decrement"
           class="lws-decrement"
       />
   </form>
</div>
<div class="numbers">
   <h2 class="lws-singleResult"></h2>
</div>
</div>`
matchContainer.appendChild(matchDiv);

}

// add new match 
addMatch.addEventListener('click',()=>{
    const state = store.getState()
    newMatch();
});

// default behavior change
matchContainer.addEventListener('click', (e)=>{
   const target = e.target;
   if(target.getAttribute('type')){
        target.addEventListener('keydown',(e)=>{
            if(e.key ==='Enter'){
                e.preventDefault()
            }
        })
   }
});

// create delete match function 
function deleteMatch (e){
    isDelete = e.target;
    if(isDelete.getAttribute('src')){
        const deleteMatchElement = isDelete.parentNode.parentNode.parentNode.parentNode;
        deleteMatchElement.removeChild(isDelete.parentNode.parentNode.parentNode)
        console.log(deleteMatchElement);
    }
    
}

// delete match 
matchContainer.addEventListener('click', (e)=>{
    deleteMatch(e)
})

// create increment function 
    function increment(e) {
        const targetEl = e.target;
         if(targetEl.getAttribute('type') && targetEl.getAttribute('class')==='lws-increment' ){
             if (e.key === 'Enter') {
                 const value = targetEl.value;
                 store.dispatch({
                     type: 'increment',
                     payload:Number(value),
                 });
                 targetEl.value ='';
             }
        }
    }

// create decrement function 
const decrement = (e) =>{
    const state = store.getState();
    const targetEl = e.target
    console.log(targetEl);
    if(targetEl.getAttribute('type') && targetEl.getAttribute('class')==='lws-decrement'){
        if(e.key==='Enter'){
            const value = targetEl.value;
            console.log(value);
            store.dispatch({
                type:'decrement',
                payload:Number(value),
                id:state.id,
            })
            targetEl.value ='';
        }
    }
}

// increment
matchContainer.addEventListener('keyup', (e)=>{
    increment(e);
})

// decrement 
matchContainer.addEventListener('keyup', (e)=>{
    decrement(e)
})

// reset all score
resetButton.addEventListener('click', ()=>{
    for (const result of totalResult ){
         result.innerText = 0;
    }
})
