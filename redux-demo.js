const redux=require('redux')
const reducer=(state={counter: 0},action)=>
{
    return {counter: state.counter+1}
}
const store=redux.createStore(reducer)
const subscriber=()=>
{
    const latest=store.getState()
    console.log(latest)
}
store.subscribe(subscriber)
store.dispatch({type: 'inc'})