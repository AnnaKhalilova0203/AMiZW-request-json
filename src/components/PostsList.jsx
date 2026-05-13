import { useEffect, useState } from "react";
import "./PostsList.css";

function PostsList() {
const [posts, setposts] = useState([]);
const [loading, setloading] = useState(false);
const [error, seterror] = useState("");


    const fetchPosts = async () => {
       setloading (true);
       seterror ("");


        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok){
                throw new Error("nie udalo sie pobrac danych z api")
            }
            const data = await response.json();
            const parsedpost = data.slice(0,10).nap((post) => ({
                id : post.id,
                title : post.title,
                body : post.body
            }
            ));
            setposts(parsedpost);
        } catch (err) {
           seterror(err.message);
           setposts([]);
        
        } finally {
           setloading(false);
          
        }
    };

    useEffect(() => {
      fetchPosts();

    }, []);

    return (
        <section className="posts-section">
            <div className="posts-container">
                <div className="posts-header">
                    <div>
                        <h1>Lista postów</h1>
                        <p>Pobieranie danych z API w React</p>
                    </div>

                    <button onClick={fetchPosts} disabled={loading} className="reload-btn">
                   {loading ? "pobieranie...":"pobierz ponownie"}

                    </button>
                </div>

                {loading && (
                    <p className="info-message">Ładowanie danych...</p>

                )}

                {error && (
                    <p style={{color:"red"}}>
                        błąd: {error}
                    </p>
                )}

                {!loading && !error && posts.length === 0 && (
                    <p>Brak postow do wyswietlenia</p>
                )}

                {!loading && !error && posts.length > 0 && (
                    <div>
                        (posts.map((post) => (
                            <article key={post.id}>
                                <h3>{post.title}</h3>
                                 <p>{post.body}</p>
                            </article>
                        )))
                    </div>
                )}

                {/* TODO:
            W każdej karcie pokaż:
            - id posta
            - tytuł
            - treść */}
            </div>
        </section>
    );
}

export default PostsList;