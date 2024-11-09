import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";



export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })


    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const { fetchCategories, categories: { drinks }, searchRecipes, showNotification } = useAppStore()



    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (item: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [item.target.name]: item.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //VALIDAR CAMPOS VACIOS
        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios!',
                error: true
            })
            return
        }

        searchRecipes(searchFilters)

    }


    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-blue-950'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to="/"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600 uppercase font-bold underline' : 'text-white uppercase font-bold'
                            }>Inicio</NavLink>
                        <NavLink to="/favorites"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-400 uppercase font-bold underline' : 'text-white uppercase font-bold'
                            }>Favoritos</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form action=""
                        className="md:w-1/2 2xl:w-1/3 p-10
                    bg-blue-600 my-32 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o Ingredientes:</label>
                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente Ej. Vodka, Tequila, Cafe"
                                onChange={handleChange}
                                value={searchFilters.ingredient}

                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoria:</label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">--Seleccione--</option>
                                {drinks.map((category) => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value='Buscar Recetas'
                            className="cursor-pointer bg-blue-900 text-white
                         font-extrabold w-full p-2"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
