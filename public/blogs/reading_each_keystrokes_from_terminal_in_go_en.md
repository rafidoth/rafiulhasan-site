---
title: "reading each keystroke from terminal in go"
author: "S Rafiul Hasan"
publishDate: "2026-03-04"
excerpt: ""
tags: ["golang", "terminal", "cli", "shell"]
coverImage: ""
---
### Problem Background

By default terminal in UNIX based operating systems be in canonical mode. what is canonical mode ? when we run go terminal based app (like I built a simple shell that I run using go run . and type commands, it reads commands then do some stuff based on the command. The moment we run the go app in terminal, the terminal waits for `Enter`  to be pressed by user before that no command gets processed. All other chars like `/t`  which works as tab spacing also handled internally and when user press enters the whole command string comes into the code execution part (the backend for shell app). But to we want our feature to be a command that should be auto-completed once pressed `<TAB>` if there exists a match for the partially written command. I broke the problem into 2 parts.

1. Taking each keystrokes one by one and combining them to a string gives use the final command and also the control to put logic based on any key stroke.
2. After we parse the command to a string then pass it to the rest of the application  to handle it.

### Problem Statement

Make a function to read keystrokes one by one and if the key stroke is <TAB>  then print `“Autocomplete Feature Not Implemented Yet, but will be implemented here”` and the function returns the whole string after concatenation.

### Solution

Let’s start from what output I’m expecting.  

```go
func main() {
	for {
		fmt.Print("> ")
		command := readRawInput()
		// Rest of the application logics
		fmt.Println(command)
	}
}
```

There `readRawInput()`  should return a string of the whole command and we can later use this command to the rest of the application.

**Getting out of canonical mode**

Unix terminals work by default in canonical mode, it waits for `Enter`  press to get the command typed by user, `Ctrl+c`  to kill any process etc things are internally handled. So, to get each of the keystrokes I need to get out of canonical mode. I’ll be using a package [term](https://pkg.go.dev/golang.org/x/term)  that provides support functions for dealing with terminals, as commonly found on UNIX systems. 

`fd`  is file descriptor, it will help us to  know the current settings of the terminal. To be precise about `fd`  I copied this from google. 

> 
> 
> 
> A **file descriptor (FD)** is a non-negative integer used by the operating system to identify an open file or other input/output (I/O) resource, such as a pipe, network  socket, or device.
> 

By providing this to `term.MakeRaw()` we can receive the `oldState`  which normally should contain the settings for canonical mode and echo (this things get done under the hood of `MakeRaw()`  function). I deferred the restoration of old state so that after I’m done I can restore back to canonical mode (this is necessary otherwise other programs won’t be able to read input like as usual from terminal). 

```go
func readRawInput(fd int) string {
	oldState, err := term.MakeRaw(fd)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error :  setting terminal : %v \n", err)
	}
	defer term.Restore(fd, oldState)
	fmt.Println(oldState)
	return "hello"

}

func main() {
	fd := int(os.Stdin.Fd())
	for {
		fmt.Print("$ ")
		command := readRawInput(fd)
		fmt.Println(command)
	}
}
```

Next, I’ll read the keystrokes from `Stdin`  using its `Read`  function. In the below code snippet see the `buf` array of byte and its size is 1. When this `buf`  array will be passed into `os.Stdin.Read(buf)`  this will store the each 1 byte written in the Standard Input to this `buf` array. we’re getting each byte now we can process each byte.

```go

func readRawInput(fd int) string {
	oldState, err := term.MakeRaw(fd)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error :  setting terminal : %v \n", err)
	}
	defer term.Restore(fd, oldState)

	var line []byte
	buf := make([]byte, 1)

	for {
		n, err := os.Stdin.Read(buf)
		if err != nil || n == 0 {
			break
		}

	}

	return "hello"
}
```

Now inside the above for loop I can read the **One Byte** in a variable called `char`  and append it to the line array and also print the char so I can see what key I’m pressing. Be little careful about running it because I haven’t handled any other keys like `Enter (new line)`  or `Kill (Ctrl+c)`  so if you run you may need to close the terminal in order to kill the process. 

```go
	var line []byte
	buf := make([]byte, 1)
	for {
		n, err := os.Stdin.Read(buf)
		if err != nil || n == 0 {
			break
		}
		char := buf[0]
		line = append(line, char)
		fmt.Print(string(char))
	}
```

So, let’s quickly handle the necessary keys such as `Enter` for ending user input, `Backspace` for undoing keystrokes , `Ctrl+c`  for killing the process, and on `Tab`  press I’ll print a random string. 

```go
func readRawInput(fd int) string {
	oldState, err := term.MakeRaw(fd)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error :  setting terminal : %v \n", err)
	}
	defer term.Restore(fd, oldState)

	var line []byte
	buf := make([]byte, 1)

	for {
		n, err := os.Stdin.Read(buf)
		if err != nil || n == 0 {
			break
		}
		char := buf[0]

		if char == '\n' || char == '\r' {
			return strings.TrimSpace(string(line))
		}

		if char == '\t' {
			fmt.Println("Autocomplete not implemented yet")
		}
		if char == 127 || char == 8 {
			if len(line) > 0 {
				line = line[:len(line)-1]
				fmt.Print("\b \b")
			}
			continue
		}

		if char == 3 {
			fmt.Println("^C")
			line = nil
			break
		}

		line = append(line, char)
		fmt.Print(string(char))
	}

	cmdString := string(line)
	command := strings.TrimSpace(cmdString)
	return command
}
```

Finally for auto-complete feature I’ve just used `strings.hasPrefix()`  to check if there’s available auto complete or not. But to explore more raw I could implement a Trie DS, may be you can. Try it. 

```go
package main

import (
	"fmt"
	"os"
	"strings"

	"golang.org/x/term"
)

func strProcessor(line []byte) string {
	return strings.TrimSpace(string(line))
}

func readRawInput(fd int) string {
	oldState, err := term.MakeRaw(fd)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error :  setting terminal : %v \n", err)
	}
	defer term.Restore(fd, oldState)

	var line []byte
	buf := make([]byte, 1)

	for {
		n, err := os.Stdin.Read(buf)
		if err != nil || n == 0 {
			break
		}
		char := buf[0]

		if char == '\n' || char == '\r' {
			fmt.Print("\r\n")
			return strProcessor(line)
		}

		if char == '\t' {
			partial := strProcessor(line)
			completed := autocomplete(partial)
			if len(partial) < len(completed) {
				completed = completed + " "
				fmt.Print(completed[len(partial):])
				line = []byte(completed)
			}

			continue
		}

		if char == 127 || char == 8 {
			if len(line) > 0 {
				line = line[:len(line)-1]
				fmt.Print("\b \b")
			}
			continue
		}

		if char == 3 {
			line = nil
			fmt.Print("\r\n^C")
			break
		}

		line = append(line, char)
		fmt.Print(string(char))
	}

	cmdString := string(line)
	command := strings.TrimSpace(cmdString)
	return command
}

func autocomplete(partial string) string {
	builtins := []string{"echo", "exit"}
	for _, str := range builtins {
		if strings.HasPrefix(str, partial) {
			return str
		}
	}
	return ""
}

func main() {
	fd := int(os.Stdin.Fd())
	for {
		fmt.Print("$ ")
		command := readRawInput(fd)
		if command == "exit" {
			break
		}

		if len(command) == 0 {
			break
		}

		command = strings.TrimSpace(command)
		commandWithExtractedArgs := extractArguments(command)
		primary := commandWithExtractedArgs[0]
		args := commandWithExtractedArgs[1:]

		if command == "exit" {
			break
		} else if primary == "echo" {
			Echo(args...)
		} else if primary == "type" {
			if len(args) == 0 {
				fmt.Println("no arguments")
				continue
			}
			Type(args[0])
		} else if primary == "pwd" {
			Pwd()
		} else if primary == "cd" {
			Cd(args[0])
		} else {
			execute(primary, args)
		}
	}
}
```
