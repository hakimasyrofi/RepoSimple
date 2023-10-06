package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sort"
	"time"

	"github.com/gin-gonic/gin"
)

func GetProfile(c *gin.Context) {
	username := c.Param("username")

	apiUrl := fmt.Sprintf("https://api.github.com/users/%s", username)
	response, err := http.Get(apiUrl)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		c.JSON(response.StatusCode, gin.H{"error": "Request failed"})
		return
	}

	var githubData map[string]interface{}
	err = json.NewDecoder(response.Body).Decode(&githubData)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	reposUrl := fmt.Sprintf("https://api.github.com/users/%s/repos", username)
	reposResponse, err := http.Get(reposUrl)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer reposResponse.Body.Close()

	if reposResponse.StatusCode != http.StatusOK {
		c.JSON(reposResponse.StatusCode, gin.H{"error": "Request failed"})
		return
	}

	var reposData []map[string]interface{}
	err = json.NewDecoder(reposResponse.Body).Decode(&reposData)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	numberOfRepo := len(reposData)
	githubData["numberOfRepo"] = numberOfRepo

	sort.Slice(reposData, func(i, j int) bool {
		timeI, _ := time.Parse(time.RFC3339, reposData[i]["updated_at"].(string))
		timeJ, _ := time.Parse(time.RFC3339, reposData[j]["updated_at"].(string))
		return timeI.After(timeJ)
	})

	var limitedReposData []map[string]interface{}
	maxRepos := 6
	if len(reposData) > maxRepos {
		limitedReposData = reposData[:maxRepos]
	} else {
		limitedReposData = reposData
	}

	githubData["repos"] = limitedReposData

	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, githubData)
}
