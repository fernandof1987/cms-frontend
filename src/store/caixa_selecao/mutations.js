export function setSingleRowSelected (state, newState) {
    //console.log('state: ', state.singleRowSelected)
    //console.log('newState: ', newState)
    //state.singleRowSelected = newState
    //state.singleRowSelected.push( newState )

    //limpa array com a tabela de entrada
    state.singleRowSelected = state.singleRowSelected.filter( el => el.table != newState.table )
    //insere novo estado da linha da tabela
    state.singleRowSelected.push( newState )
    
    //let rs = state.singleRowSelected.filter( el => el.table != table )
    //console.log(rs)
    //rs.singleRowSelected.push(newState)

    //state.singleRowSelected
    
}

