import dayjs from "dayjs"
import "dayjs/locale/id"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Container from "../components/Container"
import DateCard from "../components/Date-card"
import TypableInput from "../components/Typable-input"
import LabeledButton from "../components/Labeled-button"
import { axiosErrorHandler } from "../utils/axios-error-handler"
import { useAlertContext } from "../hooks/alert-context-hook"
import { todoApi, TodoListResponse } from "../api/todo"
import CheckboxInput from "../components/Checkbox-input"

interface TodoDate {
    day: number
    month: number
    year: number
}

type TodoListWithLoading = (TodoListResponse[number] & { isLoading: boolean })[]

dayjs.locale("id")

function getTodoMonthDays(): TodoDate[] {
    const now = dayjs()
    const year = now.year()
    const month = now.month() + 1
    const daysInMonth = now.daysInMonth()

    const days: TodoDate[] = []
    for (let day = 1; day <= daysInMonth; day++) {
        days.push({ day, month, year })
    }
    return days
}

function getDayName(date: TodoDate): string {
    return dayjs(`${date.year}-${date.month}-${date.day}`, "YYYY-M-D").format("dddd")
}


function getMonthName(month: number): string {
    return dayjs().month(month - 1).format("MMM");
}

function compareDate(date: TodoDate, dateToCompare: TodoDate): boolean {
    const dayjsDate = dayjs(`${date.year}-${date.month}-${date.day}`, "YYYY-M-D")
    const dayjsDateToCompare = dayjs(`${dateToCompare.year}-${dateToCompare.month}-${dateToCompare.day}`, "YYYY-M-D")
    return dayjsDate.isSame(dayjsDateToCompare, 'day')
}

export default function Todo() {
    const monthDays = getTodoMonthDays()

    const navigate = useNavigate()
    const today = dayjs()

    const [todoDays] = useState<TodoDate[]>(monthDays)
    const [selectedDate, setSelectedDate] = useState<TodoDate>({
        day: today.date(),
        month: today.month() + 1,
        year: today.year()
    })
    const [todoText, setTodoText] = useState<string>('')
    const { showAlert } = useAlertContext()
    const [requestLoading, setRequestLoading] = useState<boolean>(false)
    const [todoList, setTodoList] = useState<TodoListWithLoading>([])
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0)

    useEffect(() => {
        const fetchTodoList = async () => {
            try {
                const response = await todoApi.todoList({
                    createdAt: `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`
                })
                setTodoList(response.data.map(todo => ({
                    ...todo,
                    isLoading: false
                })))
            } catch (error) {
                const errorMessage = axiosErrorHandler(error)
                showAlert(errorMessage)
            }
        }
        fetchTodoList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshTrigger, selectedDate])

    useEffect(() => {
        const firstSelectedDateCardDOM = document.getElementById(
            `date-${selectedDate.day}-${selectedDate.month}-${selectedDate.year}`
        )
        if (firstSelectedDateCardDOM) {
            firstSelectedDateCardDOM.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddTodoSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (todoText) {
                setRequestLoading(true)
                await todoApi.addTodo({
                    category: 'any',
                    createdAt: `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`,
                    name: todoText
                })
                setRefreshTrigger(prev => prev + 1)
                setRequestLoading(false)
                showAlert('Sukses menambahkan')
                setTodoText('')
            }
        } catch (error) {
            setRequestLoading(false)
            const errorMessage = axiosErrorHandler(error)
            showAlert(errorMessage)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        showAlert('Logout sukses')
        navigate('/login')
    }

    return <Container>
        <div className="flex flex-col bg-white shadow-lg rounded-xl w-[375px] h-min-screen p-6 space-y-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{
                    getDayName(selectedDate)
                }</h1>
                <LabeledButton label="logout" className="w-fit" onClick={handleLogout} />
            </div>
            <div className="flex rounded-xl overflow-x-auto border border-gray-200">
                {todoDays.map((todoDay, index) => (<div
                    key={index}
                    id={`date-${todoDay.day}-${todoDay.month}-${todoDay.year}`} // unique date id for scrollview
                >
                    <DateCard
                        date={todoDay.day}
                        month={getMonthName(todoDay.month)}
                        selected={compareDate(todoDay, selectedDate)}
                        key={index}
                        onClick={() => setSelectedDate({
                            day: todoDay.day,
                            month: todoDay.month,
                            year: todoDay.year
                        })}
                    />
                </div>))}
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 mt-2">
                {
                    todoList.map((todo, index) => (<CheckboxInput
                        key={index}
                        checklist={todo.completed}
                        title={todo.todoTitle}
                        disabled={todo.isLoading}
                        onChange={async () => {
                            let newTodoList = [...todoList]
                            try {
                                newTodoList[index].isLoading = true
                                setTodoList(newTodoList)
                                await todoApi.updateTodo({
                                    completed: !todo.completed,
                                    todoId: todo.todoId
                                })
                                showAlert('Sukses update todo')
                            } catch (error) {
                                const errorMessage = axiosErrorHandler(error)
                                showAlert(errorMessage)
                            }
                            newTodoList = [...todoList] // new array for new state
                            newTodoList[index].completed = !todo.completed // set new array value for changed todo
                            newTodoList[index].isLoading = false
                            setTodoList(newTodoList) // re set for re render from new todo list
                        }}
                    />))
                }
            </div>
            <form onSubmit={handleAddTodoSubmit} className="flex">
                <TypableInput value={todoText} onChange={e => setTodoText(e.target.value)} className="w-[250px] mr-2" placeholder="ingin melakukan apa hari ini ?" />
                <LabeledButton disabled={!todoText.trim()} className={`${!todoText.trim() || requestLoading ? 'opacity-50 cursor-not-allowed' : ''}`} label="ADD" />
            </form>
        </div>
    </Container>
}
