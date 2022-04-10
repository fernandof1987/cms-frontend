export function setSingleRowSelected (state, newState) {
    //console.log('state: ', state.singleRowSelected)
    //console.log('newState: ', newState)
    //state.singleRowSelected = newState
    //state.singleRowSelected.push( newState )

    //limpa array com a tabela de entrada
    //state.singleRowSelected = state.singleRowSelected.filter( el => el.table != newState.table ) //removido 2022-03-29

    //console.log('state.singleRowSelected.length --before filter', state.singleRowSelected.length)

    //state.singleRowSelected = state.singleRowSelected.filter( el => el.table != newState.table && el.id != newState.id ) //adicionado 2022-03-29
    state.singleRowSelected = state.singleRowSelected.filter( el => el.id != newState.id ) //adicionado 2022-03-29

    //console.log('state.singleRowSelected.length --after filter', state.singleRowSelected.length)

    //insere novo estado da linha da tabela
    state.singleRowSelected.push( newState )

    //console.log('state.singleRowSelected.length --after push', state.singleRowSelected.length)

    console.log('state.singleRowSelected mutation --after push', state.singleRowSelected)
    
    //let rs = state.singleRowSelected.filter( el => el.table != table )
    //console.log(rs)
    //rs.singleRowSelected.push(newState)

    //state.singleRowSelected
}

export function removeSingleRowSelected (state, newState) {
    state.singleRowSelected = state.singleRowSelected.filter( el => el.id != newState.id ) //adicionado 2022-03-29
}