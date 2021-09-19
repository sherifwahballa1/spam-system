# spam-system
#### reporting system for users that lets them report spam to the social media platform, and our spam protection team.

## Run
* `docker-compose up --build`

>The app should run on <span style="color:orange; font-weight: bold;">http://locahost:4200</span>


"Reporting system Endpoints"
## Endpoints

>ADMIN

- `GET /api/reports/` (get all reports) 
___

- `PUT /api/reports/${id}` (Resolve report) 
   
    **`Query params`**

    * <span style="font-weight: 500; color: orange;">`id` : </span> (The report ID need to resolve the report)
___

- `POST /api/reports/${postId}` (remove content by id for users)
  - suppose that i have a blackList file that save the blocked ids posts

    **`Query params`**

    * <span style="font-weight: 500; color: orange;">`postId` : </span> (The id need to remove post content)

