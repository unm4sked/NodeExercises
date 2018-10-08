const api = require("./api");
const _ = require("lodash");
// Add all required imports, remember to use es5 syntax

// export default module
module.exports = async input => {
  const empty = [];

  /**
   * Diseases
   */
  const oneDiseases = input.diseases.map(x => empty.push(diseasesSmth(x)));

  const diseases = await Promise.all(empty);

  /**
   * Interests
   */
  const sports = input.interests
    .filter(x => x.field === "sport")
    .map(x => x.description);

  const posts = await input.interests
    .filter(x => x && x.field !== "sport")
    .map(x => {
      return PostSomeData({
        title: x.field,
        categories: x.comment,
        content: x.description
      });
    });

  const xxxD = await Promise.all(posts);
  //console.log(xxxD);

  //console.log(xxxD);
  const lol = xxxD
    .filter(x => x)
    .map(x => ({ title: x.title, id: x.id.toString() }));
  let xxcxca = _.groupBy(lol, "title");
  const result = _.mapValues(_.groupBy(lol, "title"), v => _.map(v, "id"));
  console.log(result);
  // const posts = input.interests
  //   .filter(x => x.field !== "sport")
  //   .map(x => PostSomeData(x.description));
  //console.log(posts);
  return {
    ["name"]: input.name,
    ["diseases"]: diseases,
    ["interests"]: sports,
    ["queried"]: result
  };
};

function PostSomeData(value) {
  return api
    .createPost(value)
    .then(x => {
      return x;
    })
    .catch(x => console.log("!!!! ERROR: ", x.response.statusText));
}

function diseasesSmth(value) {
  return api.fetchIcd10(value).then(x => {
    if (x.data && x.data.length > 0) {
      return x.data[0];
    }
    return { [value]: "not found" };
  });
}

/**
 * Steps of our work
 *
 * 1. Get input data from input.json, console.log the output
 *
 * 2. Build icd10 fetch function
 * 3. Diseases
 *    - Fetch via disease name for records
 *    - if records found just pick first one from array
 *    - if no records found - push an object with { <disease-name>: 'not-found' }
 * 4. Interests
 *    - we want to have only an array of strings that contains the description of all "sports"
 *    - e.g. ['narty', 'pilka plazowa', ...]
 * 5. Using api, create new posts for each interest that were not "sports" => e.g. "jedzenie", "nauka"
 * 6. Query posted stuff (api.fetchPosts)
 *    - we need to do operation on result array, we need to group the results and get list of ids
 * 7. Final Results should look like this:
 *
 * {
 *  "name": <Name>,
 *  "diseases": [
 *    { ... },
 *    { ... },
 *    ...
 *  ],
 *  "interests": ['name1', 'name2', 'name3', ...],
 *  "queried": {
 *    "jedzenie": ['id1', 'id2'],
 *    "nauka": ['id1', 'id2'],
 *  }
 * }
 */
