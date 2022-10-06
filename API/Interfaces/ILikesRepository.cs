using APi.Helpers;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
        Task<AppUser> GetUserWithLike(int userId);       
        Task<PageList<LikeDto>> GetUserLikes(LikesParams likesparams);       
    }
}