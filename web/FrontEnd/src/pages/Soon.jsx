import Links from "../components/links";
import '../styles/soon.css';
import linkIcon from '../assets/link.svg'

function Soon() {
  return (
    
  <main className="soonMain">
  <h1>Coming soon!</h1>
  <div className="relatedLinks">
    <div className="relatedLinksDiv">
    <img src={linkIcon} className="linkIcon" alt="linkIcon" />
    <h3>Related links:</h3>
    </div>
    <Links />
  </div>
  </main>)
  ;
}
export default Soon;
