package handlers

import "sync"

var DataMutex sync.Mutex
var VisitorCount int

type VisitorData struct {
	Count           int                      `json:"count"`
	LoggedInVisitor []map[string]interface{} `json:"loggedInVisitor"`
}
