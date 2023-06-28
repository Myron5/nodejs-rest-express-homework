function isLeap(year) {
  if (arguments.length === 0) throw new Error('year must exist');
  else if (typeof year !== 'number') throw new Error('year must be number');
  else if (!Number.isInteger(year)) throw new Error('year must be integer');
  else if (year < 42) throw new Error('year must be 42 or more');

  const date = new Date(year, 2, 0);
  const days = date.getDate();
  return days === 29;
}

describe('test isLeapYear Function', () => {
  test('2008 - true', () => {
    const result = isLeap(2008);
    expect(result).toBe(true);
  });

  test('2003 - false', () => {
    const result = isLeap(2003);
    expect(result).toBe(false);
  });

  test('1900 - false', () => {
    const result = isLeap(1900);
    expect(result).toBe(false);
  });

  test('2000 - false', () => {
    const result = isLeap(2000);
    expect(result).toBe(true);
  });

  test('42 - false', () => {
    const result = isLeap(42);
    expect(result).toBe(false);
  });

  test('41 - year must be 42 or more', () => {
    const result = () => isLeap(41);
    expect(result).toThrow('year must be 42 or more');
  });

  test('2008.4 - error year must be integer', () => {
    const result = () => isLeap(2008.4);
    expect(result).toThrow('year must be integer');
  });

  test('Empty argument - error year must exist', () => {
    const result = () => isLeap();
    expect(result).toThrow('year must exist');
  });

  test('Undefined () - year must be number', () => {
    const result = () => isLeap(undefined);
    expect(result).toThrow('year must be number');
  });

  test('types Array [] - error year must be number', () => {
    const result = () => isLeap([]);
    expect(result).toThrow('year must be number');
  });

  test('types String "" - error year must be number', () => {
    const result = () => isLeap('2000');
    expect(result).toThrow('year must be number');
  });

  test('types Object {} - error year must be number', () => {
    const result = () => isLeap({});
    expect(result).toThrow('year must be number');
  });

  test('types Function () => {} - error year must be number', () => {
    const result = () => isLeap(() => {});
    expect(result).toThrow('year must be number');
  });

  test('types Boolean true - error year must be number', () => {
    const result = () => isLeap(true);
    expect(result).toThrow('year must be number');
  });

  test('types Boolean false - error year must be number', () => {
    const result = () => isLeap(false);
    expect(result).toThrow('year must be number');
  });

  test('types NULL null - error year must be number', () => {
    const result = () => isLeap(null);
    expect(result).toThrow('year must be number');
  });
});
