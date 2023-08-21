import React from "react";
import styles from "./Dashborad.module.css";
import { BiLinkAlt, BiSearchAlt } from "react-icons/bi";
import { IoLocationSharp } from 'react-icons/io5'
import { BsFillBuildingsFill } from 'react-icons/bs'

function Dashboard() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [ativo, setAtivo] = React.useState(false);
  const [notFound, setNotFound] = React.useState(null);
  const [username, setUsername] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (username !== '') {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const json = await response.json();
      if ('message' in json) {
        setUsername('')
        setError(null)
        setNotFound('Usuário não encontrado.')

      } else {
        setUsername('')
        setData(json)
        setError(null)
        setAtivo(true)
        setNotFound(null)

      }

    } else {
      setError('Você precisa preencher este campo!')
      setNotFound(null)
    }
  }


  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.devFinder}>
            <h1>Devfinder</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="Nome de Usuário..."
                name="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <button><BiSearchAlt size={30} color="#eee"/></button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {notFound && <p className={styles.error}>{notFound}</p>}
          </div>

          {ativo && (
            <div className={styles.containerUser}>
              <div className={styles.contentUser}>
                <img src={data.avatar_url} alt={data.login} />
                <div className={styles.user}>
                  <h1>{data.name}</h1>
                  <h4>@{data.login}</h4>
                  {data.bio !== null ? (
                    <p>{data.bio}</p>
                  ) : (
                    <p>não possui biografia</p>
                  )}
                </div>
                <a className={styles.link} href={data.html_url} target="blank">
                  <BiLinkAlt size={25}/>
                </a>
              </div>

              <div className={styles.userStatus}>
                <div>
                  <h4>Repositórios</h4>
                  <p>{data.public_repos}</p>
                </div>
                <div>
                  <h4>Seguidores</h4>
                  <p>{data.followers}</p>
                </div>
                <div>
                  <h4>Seguindo</h4>
                  <p>{data.following}</p>
                </div>
              </div>

              <div className={styles.location}>
                <p><span><IoLocationSharp size={20} /></span>{data.location}</p>
                {data.company ? (
                  <p><span><BsFillBuildingsFill size={20} /></span>{data.company}</p>
                ) : (
                  <p><span><BsFillBuildingsFill size={20}/></span>Not Available</p>
                )}
              </div>
            </div>
          )}

          
          
        </div>
      </section>
    </>
  );
}

export default Dashboard;
