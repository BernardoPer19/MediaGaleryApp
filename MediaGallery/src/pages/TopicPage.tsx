import { useParams } from "react-router-dom";
import PhotoLists from "../components/PhotoLists";

function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();

  if (!topicId) return <p>No topic selected</p>;

  return (
    <div>
      <PhotoLists currentQuery={topicId} />
    </div>
  );
}

export default TopicPage;
