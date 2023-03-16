---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'My First Blog Post'
pubDate: 2022-07-01
description: "This is the first post of my new Astro blog."
author: "Astro Learner"
image:
  url: "https://astro.build/assets/blog/astro-1-release-update/cover.jpeg"
  alt: "The Astro logo with the word One."
tags: ["astro", "blogging", "learning in public"]
---

Event-driven programming is a paradigm where the flow of a program is determined by events, rather than by the program's control flow. An event is a signal that indicates a change of state or the occurrence of an action, such as a user input, a message received over a network, or a sensor reading in an IoT device. In event-driven programming, the program registers handlers or callbacks that are executed when specific events occur.

The concept of event-driven programming has been around since the early days of computing, with some of the earliest examples dating back to the 1950s and 1960s. For instance, the Fortran programming language had a feature called "common block" that allowed different parts of a program to share data and communicate through common variables.

```FORTRAN
program eventdriven

  implicit none
  integer :: event, count

  count = 0
  
  do while (count < 5)
    ! Wait for an event to occur
    read(*,*) event
    
    ! Handle the event
    select case (event)
      case (1)
        print *, "Button 1 pressed"
      case (2)
        print *, "Button 2 pressed"
      case default
        print *, "Unknown event"
    end select
    
    count = count + 1
  end do
  
end program eventdriven
```
