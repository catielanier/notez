const ReactSelectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected || state.isFocused ? '#f5f5f5' : '#1a1a1a',
        background: state.isSelected ? '#ff7148' : state.isFocused ? '#2e79ac' : '#f5f5f5'
    })
}

export default ReactSelectStyles;