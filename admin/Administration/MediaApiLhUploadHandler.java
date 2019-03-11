@Override
	public void handle(List<FileItem> fileItemList, NetUpMediaapiImgUpload up, NetDownMediaapiImgUpload down, HttpServletResponse response) {
		System.out.println("path:"+getBasePath());
		if (!CommUtil.isEmpityList(fileItemList)) {
			List<String> paths=new ArrayList();
			for (FileItem fileItem : fileItemList) {
				String path = writeFile(fileItem);
				paths.add("../../static/img/"+fileItem.getName());//浏览器不允许使用绝对路径
				logger.info("上传成功:" + path);
				logger.info("更新数据");
			}
			down.setAllPath(paths);
 
		}
	}
 
	public static String writeFile(FileItem file){
		String fileName = getFileName(file.getName());
		fileName = formatFileName(fileName);
		fileName = getFilePrefix(fileName)+'.'+getFileSuffix(fileName);
		String path = getBasePath()+"/xmob-web/static/img/";
		//path="E:\\xmob\\trunk\\xmob-web\\static\\img\\";//图片应该放在WEB文件夹的static目录下
		File desFile = new File(path);
		if  (!desFile .exists()  && !desFile .isDirectory()) {
			System.out.println("//不存在");
			desFile .mkdir();
		}
		String result = null;
		try {
			InputStream in = file.getInputStream();
			FileOutputStream out = new FileOutputStream(path+"/"+fileName);
			//创建一个缓冲区
			byte buffer[] = new byte[1024];
			//判断输入流中的数据是否已经读完的标识
			int len = 0;
			//循环将输入流读入到缓冲区当中，(len=in.read(buffer))>0就表示in里面还有数据
			while((len=in.read(buffer))>0){
				//使用FileOutputStream输出流将缓冲区的数据写入到指定的目录(path)当中
				out.write(buffer, 0, len);
			}
			in.close();
			out.close();
			//删除处理文件上传时生成的临时文件
			file.delete();
			result = path+"/"+fileName;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 获取资源路径
	 * @return
	 */
	private static String getBasePath(){
		String template_dir = System.getProperty("user.dir");
		return template_dir.substring(0,template_dir.lastIndexOf(File.separator));
	}
 
	/**
	 * 注意：不同的浏览器提交的文件名是不一样的，有些浏览器提交上来的文件名是带有路径的，如：  c:\a\b\1.txt，而有些只是单纯的文件名，如：1.txt
	 * 处理获取到的上传文件的文件名的路径部分，只保留文件名部分
	 * @param fileName
	 * @return
	 */
	private static String getFileName(String fileName){
		fileName = fileName.substring(fileName.lastIndexOf(File.separator)+1);
		return fileName;
	}
	/**
	 * 格式化文件名
	 * @param fileName
	 * @return
	 */
	private static String formatFileName(String fileName){
		String[] sArr = fileName.split("\\.");
		String str = sArr[0];
		str = str.replaceAll(" ", "");
		str = str.replaceAll("\\s+|_", "-");
		String result = str+"."+sArr[1];
		return result;
	}
 
	/**
	 * 获得文件名前缀
	 */
	private static String getFilePrefix(String fileName){
		fileName = formatFileName(fileName);
		String[] sArr = fileName.split("\\.");
		return sArr[0];
	}
 
	/**
	 * 获得文件名后缀
	 */
	private static String getFileSuffix(String fileName){
		fileName = formatFileName(fileName);
		String[] sArr = fileName.split("\\.");
		return sArr[1];
	}
