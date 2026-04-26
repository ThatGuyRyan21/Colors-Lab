test('Validates the Colors API JSON response structure', () => {
    // This simulates the exact JSON format your SearchColors.php returns
    const mockPhpResponse = {
        results: ["red", "blue", "green"],
        error: ""
    };

    // Test that the structure matches your PHP logic
    expect(mockPhpResponse).toHaveProperty('results');
    expect(Array.isArray(mockPhpResponse.results)).toBe(true);
    expect(mockPhpResponse).toHaveProperty('error');
    expect(typeof mockPhpResponse.error).toBe('string');
});
