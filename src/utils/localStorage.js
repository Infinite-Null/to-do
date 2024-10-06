/**
 * Retrieves todo data from localStorage.
 * It parses the stored JSON string and validates that it is an array of valid todo objects.
 * If the data is missing or invalid, it returns an empty array.
 *
 * @returns {Array} An array of todo objects or an empty array if no valid data is found.
 */
const getLocalData = () => {
  try {
    const data = localStorage.getItem('todoData');

    if (!data) {
      return [];
    }

    const parsedData = JSON.parse(data);

    if (
      !Array.isArray(parsedData) ||
      !parsedData.every(
        (item) =>
          item &&
          'string' === typeof item.id &&
          'string' === typeof item.title &&
          'boolean' === typeof item.is_Done
      )
    ) {
      return [];
    }

    return parsedData;
  } catch {
    return [];
  }
};

/**
 * Stores the todo data in localStorage.
 * It converts the array of todo objects into a JSON string and stores it under the 'todoData' key.
 * If an error occurs during storage, it stores an empty array instead.
 *
 * @param {Array} data - An array of todo objects to be stored.
 * @return {void}
 */
const setLocalData = (data) => {
  try {
    localStorage.setItem('todoData', JSON.stringify(data));
  } catch {
    localStorage.setItem('todoData', '[]');
  }
};

export { getLocalData, setLocalData };
