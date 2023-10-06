package main

import (
	"backend/handlers"
	"encoding/json"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	loadDataFromFile()

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))

	r.GET("/getcount", handlers.GetVisitorCount)
	r.POST("/incrementCount", handlers.IncrementCount)
	r.POST("/addLoggedInVisitor", handlers.AddLoggedInVisitor)
	r.GET("/api/profile/:username", handlers.GetProfile)

	r.Run(":8080")
}

func loadDataFromFile() {
	file, err := os.ReadFile("data.json")
	if err != nil {
		fmt.Println("Error reading data.json:", err)
		return
	}

	var data handlers.VisitorData
	err = json.Unmarshal(file, &data)
	if err != nil {
		fmt.Println("Error unmarshalling data.json:", err)
		return
	}

	handlers.VisitorCount = data.Count
}
