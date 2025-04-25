import { Home, BookOpenText, BookA, School, BookMarked, FileVideo, FileText, NotebookPen } from "lucide-react"
import Item from "./item-type"

export const DashboardItems: Item[] = [
  {
    title: "Home",
    url: new URL("https://www.google.com/"),
    icon: Home,
  },
  {
    title: "My lessons",
    url: new URL("https://www.google.com/"),
    icon: BookOpenText,
  },
  {
    title: "Your class",
    url: new URL("https://www.google.com/"),
    icon: School,
  },
  {
    title: "My dictionary",
    url: new URL("https://www.google.com/"),
    icon: BookA,
  },
  {
    title: "My notes",
    url: new URL("https://www.google.com/"),
    icon: BookMarked,
  },
]

export const LessonsItems: Item[] = [
  {
    title: "Lesson 1",
    url: new URL("https://www.google.com/"),
    icon: FileVideo,
  },
  {
    title: "Lesson 2",
    url: new URL("https://www.google.com/"),
    icon: FileText,
  },
]

export const ExerciseItems: Item[] = [
  {
    title: "Exercise 1",
    url: new URL("https://www.google.com/"),
    icon: NotebookPen,
  },
  {
    title: "Exercise 2",
    url: new URL("https://www.google.com/"),
    icon: NotebookPen,
  },
]