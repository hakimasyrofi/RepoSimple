package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func IncrementCount(c *gin.Context) {
	DataMutex.Lock()
	defer DataMutex.Unlock()

	var visitorData VisitorData

	file, err := os.ReadFile("data.json")
	if err != nil {
		fmt.Println("Error reading data.json:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = json.Unmarshal(file, &visitorData)
	if err != nil {
		fmt.Println("Error unmarshalling data.json:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	visitorData.Count++

	jsonData, err := json.Marshal(visitorData)
	if err != nil {
		fmt.Println("Error marshalling data:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = os.WriteFile("data.json", jsonData, os.ModePerm)
	if err != nil {
		fmt.Println("Error writing data.json:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Visitor count incremented"})
}

func AddLoggedInVisitor(c *gin.Context) {
	DataMutex.Lock()
	defer DataMutex.Unlock()

	var visitorData VisitorData

	file, err := os.ReadFile("data.json")
	if err != nil {
		fmt.Println("Error reading data.json:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = json.Unmarshal(file, &visitorData)
	if err != nil {
		fmt.Println("Error unmarshalling data.json:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var loggedInVisitor map[string]interface{}
	if err := c.ShouldBindJSON(&loggedInVisitor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(loggedInVisitor) > 0 {
		visitorData.LoggedInVisitor = append(visitorData.LoggedInVisitor, loggedInVisitor)
	}

	if len(visitorData.LoggedInVisitor) > 3 {
		visitorData.LoggedInVisitor = visitorData.LoggedInVisitor[len(visitorData.LoggedInVisitor)-3:]
	}

	jsonData, err := json.Marshal(visitorData)
	if err != nil {
		fmt.Println("Error marshalling data:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = os.WriteFile("data.json", jsonData, os.ModePerm)
	if err != nil {
		fmt.Println("Error writing data.json:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logged in visitor added"})
}
