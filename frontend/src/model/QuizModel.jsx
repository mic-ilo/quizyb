class QuizModel {
  async createQuiz(quiz, UserId) {
    try {
      const response = await fetch(`http://localhost:3000/quiz/${UserId}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(quiz), // body data type must match "Content-Type" header
      });

      if (response.status === 500) {
        throw new Error("Internal server okay");
      } else if (!response.ok) {
        throw new Error("Failed to create a quiz"); // Change this error message
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error
    }
  }
  async getQuizzes(UserId) {
    try {
      const response = await fetch(`http://localhost:3000/result/${UserId}/quizzes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });

      if (response.status === 500) {
        throw new Error("Internal server okay");
      } else if (!response.ok) {
        throw new Error("Error retrieving quizzes by builder"); // Change this error message
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error
    }
  }

  async getQuiz (quizId) {
    try {
      const response = await fetch(`http://localhost:3000/answer/${quizId}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

      });

      const data = await response.json();
      return data;
    } catch (err) {
      return err
    }}

    //post quiz result
    async postQuizResult (quizId, quizResult) {
      try {
        const response = await fetch(`http://localhost:3000/answer/${quizId}`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect: "follow", // manual, *follow, error
          // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(quizResult), // body data type must match "Content-Type" header
        });

        const data = await response.json();
        return data;
      } catch (err) {
        return err
      }

  }
  async getResultByQuiz(quizId) {
    try {
      const response = await fetch(`http://localhost:3000/result/${quizId}/players`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });

      if (response.status === 500) {
        throw new Error("Internal server okay");
      } else if (!response.ok) {
        throw new Error("Error retrieving players by builder"); // Change this error message
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Received quiz player data:", data); // Add this line
        return data;
      } else {
        console.error("Failed to fetch player data");
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  }
}

const model = new QuizModel();
export default model;