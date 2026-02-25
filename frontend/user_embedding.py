import os
import numpy as np
from supabase import create_client, Client
from typing import List, Dict

# Read from frontend credentials as requested "the supabase client in the src"
# You might want to override these with actual backend environment variables in production
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://iwfzkyklzkxscqlcvmxu.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "sb_publishable_roA420kjqxP0vZDnO20aog_ozzzn07O")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_user_embedding(user_id: int, possible_tags: List[str]) -> np.ndarray:
    """
    Creates a normalized score vector for a given user based on their likes and comments.
    - 1 point to all post tags for a like
    - 2 points to all post tags for a comment
    """
    # 1. Fetch user's likes
    likes_response = supabase.table('tazpi_likes').select('post_id').eq('user_id', user_id).execute()
    liked_post_ids = [like['post_id'] for like in likes_response.data] if likes_response.data else []

    # 2. Fetch user's comments
    comments_response = supabase.table('tazpi_comments').select('post_id').eq('user_id', user_id).execute()
    commented_post_ids = [comment['post_id'] for comment in comments_response.data] if comments_response.data else []

    interacted_post_ids = list(set(liked_post_ids + commented_post_ids))
    
    if not interacted_post_ids:
        # If no interactions, return a zero vector (or uniform depending on use case)
        return np.zeros(len(possible_tags))

    # 3. Fetch tags for the interacted posts
    posts_response = supabase.table('tazpi_posts').select('post_id, tags').in_('post_id', interacted_post_ids).execute()
    
    post_tags_map: Dict[int, List[str]] = {}
    if posts_response.data:
        for post in posts_response.data:
            # Handle possible null tags
            post_tags = post.get('tags')
            post_tags_map[post['post_id']] = post_tags if post_tags else []
            
    # 4. Initialize score dictionary with 0 points for each possible tag
    scores = {tag: 0.0 for tag in possible_tags}
    
    # 5. Calculate scores based on likes (1 point)
    for post_id in liked_post_ids:
        tags = post_tags_map.get(post_id, [])
        for tag in tags:
            if tag in scores:
                scores[tag] += 1.0
                
    # 6. Calculate scores based on comments (2 points)
    for post_id in commented_post_ids:
        tags = post_tags_map.get(post_id, [])
        for tag in tags:
            if tag in scores:
                scores[tag] += 2.0
                
    # 7. Create the score vector respecting the order of possible_tags
    score_vector = np.array([scores[tag] for tag in possible_tags])
    
    # 8. Normalize the score vector with its sum
    total_sum = np.sum(score_vector)
    if total_sum > 0:
        score_vector = score_vector / total_sum
        
    return score_vector


def get_all_users_embeddings(possible_tags: List[str]) -> Dict[int, np.ndarray]:
    """
    Fetches all users from the database and generates their embeddings.
    """
    # 1. Fetch all users
    users_response = supabase.table('profiles').select('id').execute()
    user_ids = [user['uid'] for user in users_response.data] if users_response.data else []
    
    # 2. Generate embedding for each user
    user_embeddings: Dict[int, np.ndarray] = {}
    for user_id in user_ids:
        user_embeddings[user_id] = generate_user_embedding(user_id, possible_tags)
        
    return user_embeddings

if __name__ == "__main__":
    possible_tags = ["food", "travel", "fashion", "technology", "sports", "music", "art", "gaming", "books", "movies"]
    # user_embeddings = get_all_users_embeddings(possible_tags)
    user_embeddings = generate_user_embedding(1, possible_tags)
    print(user_embeddings)