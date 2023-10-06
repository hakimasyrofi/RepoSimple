package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func GetVisitorCount(c *gin.Context) {
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

	c.JSON(http.StatusOK, gin.H{
		"count":           visitorData.Count,
		"loggedInVisitor": visitorData.LoggedInVisitor,
	})
}
