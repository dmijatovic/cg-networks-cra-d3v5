  /**
   * Create ID based on time in milliseconds and random number
   * @returns {String} unique id
   */
  function createId(){
    const time = new Date().valueOf()
    const rand = Math.round((Math.random() * 1000000))
    return `${time}CG${rand}`
  }
  
  /**
   * CreatedAt date
   * @returns {String} date in ISO format
   */
  function createdAt(){
    const d = new Date().toISOString()
    return d
  }

  export {
    createId,
    createdAt
  }