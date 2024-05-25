import Styles from './GameIsNotFind.module.css'

export const GameIsNotFind = () => {
    return(
        <div className={Styles.container}>
            <h1>Хмм... Игра не найдена</h1>
            <h4>Возможно неверно указана ссылка</h4>
            <img src="/images/smile.png" className={Styles.image} />
        </div>
    )
}