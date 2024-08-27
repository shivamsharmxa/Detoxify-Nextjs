"use client";

import { useState, useEffect, useCallback } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import ArticleModal from "./ArticleModal";
import Navbar from "./Navbar";

interface Article {
  id: number;
  title: string;
  description: string;
  body_html: string;
  url: string;
  user: {
    name: string;
  };
}

interface ArticlesProps {
  searchTerm: string;
}

const Articles: React.FC<ArticlesProps> = ({ searchTerm }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchArticles = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching articles for page ${pageNumber}`);

      const res = await fetch(
        `https://dev.to/api/articles?per_page=15&page=${pageNumber}&tag=${searchTerm}`
      );
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      console.log('Fetched articles:', data);

      if (data.length === 0) {
        setHasMore(false); // No more articles to fetch
      } else {
        setArticles((prevArticles) => [...prevArticles, ...data]);
        if (data.length < 15) {
          setHasMore(false); // No more articles available
        }
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  const fetchArticleDetails = async (articleId: number) => {
    try {
      setLoading(true);
      const res = await fetch(`https://dev.to/api/articles/${articleId}`);
      const data = await res.json();
      setSelectedArticle(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching article details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (articleId: number) => {
    fetchArticleDetails(articleId);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  // Fetch articles when the search term changes
  useEffect(() => {
    console.log('Search term changed, resetting articles and fetching new results.');
    setArticles([]); // Clear previous articles
    setPage(1); // Reset to the first page
    setHasMore(true); // Ensure we start with the ability to load more articles
    fetchArticles(1); // Fetch articles for the first page
  }, [searchTerm, fetchArticles]);

  // Fetch more articles when page changes
  useEffect(() => {
    if (page > 1) {
      console.log('Loading more articles, page:', page);
      fetchArticles(page);
    }
  }, [page, fetchArticles]);

  return (
    <>
      {/* Navbar is placed at the top */}
      <Navbar />

      {/* Main Content Area */}
      <div className="py-12 bg-gray-900 min-h-screen">
        <div className="mt-10 mx-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {articles.map((article: Article) => (
              <div key={article.id} className="flex justify-center">
                <BackgroundGradient
                  className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm"
                >
                  <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                    <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                      {article.title}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                      {article.description || "No description available"}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      By {article.user?.name || "Unknown"}
                    </p>
                    <button
                      onClick={() => handleCardClick(article.id)}
                      className="mt-4 px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition duration-200"
                    >
                      Read More
                    </button>
                  </div>
                </BackgroundGradient>
              </div>
            ))}
          </div>
        </div>

        {!loading && articles.length === 0 && searchTerm && (
          <p className="text-center text-white mt-6">
            No articles found for.
          </p>
        )}

        {!loading && hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="px-4 py-2 rounded border border-teal-600 text-teal-600 bg-white hover:bg-gray-100 transition duration-200"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More Articles"}
            </button>
          </div>
        )}

        {showModal && selectedArticle && (
          <ArticleModal onClose={closeModal}>
            <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: selectedArticle.body_html }}
            />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </ArticleModal>
        )}
      </div>
    </>
  );
};

export default Articles;
