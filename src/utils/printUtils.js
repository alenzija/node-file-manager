export const printPath = (path) => {
  return `You are currently in ${path}\n`;
};

export const printCommands = () => {
  console.log(`
  * up
  * cd path_to_directory
  * ls
  * cat path_to_file
  * add new_file_name
  * rn path_to_file new_file_name
  * cp path_to_file path_to_directory
  * mv path_to_file path_to_directory
  * rm path_to_file
  * hash path_to_file
  * compress path_to_file path_to_destination
  * decompress path_to_file path_to_destination
  * os --EOL
  * os --cpus
  * os --homedir
  * os --username
  * os --architecture
`)
};
