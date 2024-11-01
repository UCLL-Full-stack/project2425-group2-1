import Head from 'next/head';
import Image from 'next/image';
import Header from "@/components/header";
import styles from '/styles/Home.module.css';

const Home: React.FC = () => {
    return (
        <>
          <Head>
            <title>Homepage</title>
            <meta name='description' content='Homepage of the Gym Management System App'/>
            <meta name='viewport' content='width=device-width, initial-scale=1'/>
            <link rel='icon' href='/favicon.ico'/>
          </Head>
          <Header></Header>
          <main className='{styles.main}'>
              {/*<span>
                <Image
                    src="blablabla"
                    alt="Gym logo"
                    className='{styles.vercelLogo}'
                    width={50}
                    height={50}
                />
                <h1>Welcome!</h1>
              </span> */}

              <div className={styles.description}>
                <p>
                    Welcome to the Gym Management System App. This is a simple web application that allows you to manage the members of a gym. 
                    You can add, remove, and update members. You can also view all the members in the gym.
                </p>
              </div>
          </main>
        </>
    );
};

export default Home;