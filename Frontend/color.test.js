function formatColorInput(color) { 
    return color.trim().toLowerCase(); 
}

test('Validates that color input is formatted correctly', () => {
    expect(formatColorInput('  ReD  ')).toBe('red');
    expect(formatColorInput('BLUE')).toBe('blue');
    expect(formatColorInput(' green ')).toBe('green');
});
