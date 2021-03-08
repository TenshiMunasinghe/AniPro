module.exports = {
  webpack: {
    configure: webpackConfig => {
      const instanceOfMiniCssExtractPlugin = webpackConfig.plugins.find(
        plugin => plugin.constructor.name !== 'MiniCssExtractPlugin'
      )
      if (instanceOfMiniCssExtractPlugin) {
        instanceOfMiniCssExtractPlugin.options.ignoreOrder = true
      }
      return webpackConfig
    },
  },
}
