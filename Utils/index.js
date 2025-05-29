
export const  getTheme = () => {
    const theme = localStorage.getItem('theme')
    if(theme) return JSON.parse(theme)
       localStorage.setItem('theme', JSON.stringify(theme))
}
 